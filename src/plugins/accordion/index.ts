// accordion.ts

export default class Accordion {
  constructor(private readonly rootElement: HTMLElement) {
    this.init();
  }

  private init(): void {
    const accordionItems = this.rootElement.querySelectorAll(".hs-accordion");

    accordionItems.forEach((item) => {
      const button = item.querySelector(
        ".hs-accordion-toggle",
      ) as HTMLButtonElement;
      const content = item.querySelector(
        ".hs-accordion-content",
      ) as HTMLElement;

      button.addEventListener("click", () => {
        const isActive = content.classList.contains("hidden");
        this.toggleAccordion(content, isActive);
      });
    });
  }

  private toggleAccordion(content: HTMLElement, isActive: boolean): void {
    if (isActive) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  }
}

// Usage
  const accordionElement = document.querySelector('.hs-accordion-group') as HTMLElement;
  new Accordion(accordionElement);
