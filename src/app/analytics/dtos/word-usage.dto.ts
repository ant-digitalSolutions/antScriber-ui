export interface IWordsUsageDto {
  id: number;

  userId: number;

  usageCurrentDay_GPT_4: number;

  usageCurrentDay_GPT_3: number;

  usageCurrentMonth_GPT_4: number;

  usageCurrentMonth_GPT_3: number;

  wordsDailyLimit_GPT_4: number;

  wordsDailyLimit_GPT_3: number;

  wordsMonthlyLimit_GPT_3: number;

  wordsMonthlyLimit_GPT_4: number;
}
