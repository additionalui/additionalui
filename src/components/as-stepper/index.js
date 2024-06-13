import Component from '../../core/Component';

class ASStepper extends Component {
  constructor() {
    super();
    this.currentStep = 0;
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.stepperNavItems = document.querySelectorAll('[data-as-stepper-nav-item]');
      this.stepperContentItems = document.querySelectorAll('[data-as-stepper-content-item]');
      this.nextBtn = document.querySelector('[data-as-stepper-next-btn]');
      this.backBtn = document.querySelector('[data-as-stepper-back-btn]');
      this.finishBtn = document.querySelector('[data-as-stepper-finish-btn]');
      this.resetBtn = document.querySelector('[data-as-stepper-reset-btn]');

      this.updateStepper();

      this.nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.stepperContentItems.length - 1) {
          this.currentStep++;
          this.updateStepper();
        }
      });

      this.backBtn.addEventListener('click', () => {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.updateStepper();
        }
      });

      this.finishBtn.addEventListener('click', () => {
        alert('Stepper finished!');
      });

      this.resetBtn.addEventListener('click', () => {
        this.currentStep = 0;
        this.updateStepper();
      });
    });
  }

  updateStepper() {
    this.stepperNavItems.forEach((item, index) => {
      const circle = item.querySelector('span > span');
      if (index < this.currentStep) {
        item.classList.add('as-stepper-completed');
        item.classList.remove('as-stepper-active');
        circle.classList.add('as-stepper-completed', 'bg-teal-500', 'text-white');
        circle.classList.remove('as-stepper-active', 'bg-blue-600');
      } else if (index === this.currentStep) {
        item.classList.add('as-stepper-active');
        item.classList.remove('as-stepper-completed');
        circle.classList.add('as-stepper-active', 'bg-blue-600', 'text-dark');
        circle.classList.remove('as-stepper-completed', 'bg-teal-500');
      } else {
        item.classList.remove('as-stepper-completed', 'as-stepper-active');
        circle.classList.remove('as-stepper-completed', 'as-stepper-active', 'bg-teal-500', 'bg-blue-600', 'text-dark');
        circle.classList.add('bg-gray-100', 'text-gray-800');
      }
    });

    this.stepperContentItems.forEach((content, index) => {
      content.style.display = index === this.currentStep ? 'block' : 'none';
    });

    this.backBtn.style.display = this.currentStep > 0 ? 'inline-flex' : 'none';
    this.nextBtn.style.display = this.currentStep < this.stepperContentItems.length - 1 ? 'inline-flex' : 'none';
    this.finishBtn.style.display = this.currentStep === this.stepperContentItems.length - 1 ? 'inline-flex' : 'none';
    this.resetBtn.style.display = this.currentStep === this.stepperContentItems.length - 1 ? 'inline-flex' : 'none';
  }
}

window.ASStepper = new ASStepper();
window.ASStepper.init();