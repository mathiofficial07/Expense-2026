import mongoose from 'mongoose';

const dailyTotalSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
      index: true 
    },
    date: { 
      type: Date, 
      required: true,
      index: true
    },
    totalAmount: { 
      type: Number, 
      required: true, 
      default: 0 
    },
    monthYear: {
      type: String, // Format: 'YYYY-MM'
      index: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound index for faster lookups
dailyTotalSchema.index({ userId: 1, date: 1 }, { unique: true });

// Pre-save hook to update monthYear field
dailyTotalSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isNew) {
    const date = new Date(this.date);
    this.monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
  next();
});

// Static method to update daily total when an expense is added/updated/deleted
dailyTotalSchema.statics.updateDailyTotal = async function(userId, date, amountChange, isDelete = false) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return this.findOneAndUpdate(
    { userId, date: { $gte: startOfDay, $lte: endOfDay } },
    { 
      $inc: { totalAmount: isDelete ? -amountChange : amountChange },
      $setOnInsert: { 
        date: startOfDay,
        userId
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

// Static method to get monthly summary
dailyTotalSchema.statics.getMonthlySummary = async function(userId, year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  return this.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: '$totalAmount' },
        dailyAverage: { $avg: '$totalAmount' },
        daysCount: { $sum: 1 },
        maxDailySpent: { $max: '$totalAmount' },
        minDailySpent: { $min: '$totalAmount' }
      }
    },
    {
      $project: {
        _id: 0,
        totalSpent: 1,
        dailyAverage: 1,
        daysCount: 1,
        maxDailySpent: 1,
        minDailySpent: 1
      }
    }
  ]);
};

// Static method to get daily totals for a date range
dailyTotalSchema.statics.getDailyTotals = async function(userId, startDate, endDate) {
  return this.find({
    userId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });
};

const DailyTotal = mongoose.model('DailyTotal', dailyTotalSchema);

export default DailyTotal;
