import { OpenAiGPTVersionEnum } from "../../enum/content generation/openai-gtp-version.enum";

export interface SubscriptionUsageLimitException {
  gptVersion: OpenAiGPTVersionEnum;

  monthLimit: number;

  monthUsage: number;

  subscriptionLimitError: boolean;
}
