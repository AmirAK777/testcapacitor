import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../shared/register-service.service';
import { MarketingCampaign } from '../shared/marketingCampaign';
import { QuestionsComponent } from './questions/questions.component';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';
import { RegisterFormComponent } from './questions/register-form/register-form.component';
import { SecuritySmsCodeComponent } from './questions/security-sms-code/security-sms-code.component';
import { CreatePasswordComponent } from './questions/create-password/create-password.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clovis-survey',
  standalone: true,
  imports: [
    CommonModule,
    QuestionsComponent, 
    ProgressBarComponent, 
    RegisterFormComponent, 
    SecuritySmsCodeComponent, 
    CreatePasswordComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.sass'
})
export class SurveyComponent {
  campaign: MarketingCampaign | undefined;
  isModalOpen: boolean = false;

  indexQuestion: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly registerService: RegisterService
  ) {  }
  
  ngOnInit() {
    if (this.registerService.createdUser().campaignId !== undefined){
      this.openModal();
    }
    this.initSurvey();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetSurvey() {
    this.registerService.deleteLocalStarageInformations();
    this.indexQuestion = 0;
    this.closeModal();
    this.initSurvey();
  }

  initSurvey() {
    const routeParameter: string | null = this.route.snapshot.paramMap.get('id');

    if (routeParameter !== null) {
      this.registerService.getMarketingCampaignById(routeParameter)
        .subscribe((campaign: MarketingCampaign) => {
          this.campaign = campaign;
          this.registerService.updateUserProperty('campaignId', campaign.id);
        });
    }
    else {
      this.registerService.getDefaultMarketingCampaign()
        .subscribe((campaign: MarketingCampaign) => {
          this.campaign = campaign;
          this.registerService.updateUserProperty('campaignId', campaign.id);
        });
    }

    if (this.registerService.createdUser().campaignId == this.campaign?.id) {
      this.indexQuestion = this.registerService.createdUser().indexLastQuestionAnswered !== undefined ? 
                        +this.registerService.createdUser().indexLastQuestionAnswered! : 0;
    }
  }

  setAnswerSelected(answer: string | number) {
    const referenceQuestionName: string = this.campaign?.questions[this.indexQuestion].referenceQuestionName!;

    switch (referenceQuestionName) {
      case 'AGE':
        this.registerService.updateUserProperty('age', +answer);
        break;
      case 'CHILDREN':
        this.registerService.updateUserProperty('children', +answer);
        break;
      case 'MARITAL_SITUATION':
        this.registerService.updateUserProperty('maritalSituation', answer.toString());
        break;
      case 'NET_INCOME':
        this.registerService.updateUserProperty('salaryIncome', +answer);
        break;
      case 'PASSWORD_CREATION':
        this.registerService.updateUserProperty('password', answer.toString());
        break;
      case 'PHONE_NUMBER':
        this.registerService.updateUserProperty('phoneNumber', answer.toString());
        break;
      case 'SALARY_AT_RETIREMENT':
        this.registerService.updateUserProperty('salaryAtRetirement', +answer);
        break;
      case 'TARGET_RETURN':
        this.registerService.updateUserProperty('targetReturn', +answer);
        break;
      case 'TAX_PER_YEAR':
        this.registerService.updateUserProperty('taxPerYear', +answer);
        break;
    }
    this.setNextQuestion();
  }

  setNextQuestion() {
    if (this.indexQuestion <= this.campaign!.questions.length - 1) {
      this.indexQuestion += 1;
      this.registerService.updateUserProperty('indexLastQuestionAnswered', this.indexQuestion);
    }
  }
}
