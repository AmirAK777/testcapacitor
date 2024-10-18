import { Product } from "./product";
import { Question } from "./question";

export interface MarketingCampaign {
    id: string;
    name: string;
    path: string;
    color: string;
    hook: string | undefined;
    product: Product;
    questions: Array<Question>;
}
