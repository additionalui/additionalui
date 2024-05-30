import { createPopper } from "@popperjs/core";
import Component from '../../core/Component';

class ASTooltip extends Component {
    constructor() {
        super('[data-tooltip-target]');
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('[data-tooltip-target]');

            buttons.forEach(button => {
                const tooltipId = button.getAttribute('data-tooltip-target');
                const placement = button.getAttribute('data-tooltip-placement');
                const tooltip = document.getElementById(tooltipId);

                if (tooltip) {
                    const popperInstance = createPopper(button, tooltip, {
                        placement: placement || 'top',
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 8],
                                },
                            },
                        ],
                    });

                    button.addEventListener('mouseenter', () => {
                        tooltip.classList.remove('invisible', 'opacity-0');
                        tooltip.classList.add('visible', 'opacity-100');
                        popperInstance.update();
                    });

                    button.addEventListener('mouseleave', () => {
                        tooltip.classList.remove('visible', 'opacity-100');
                        tooltip.classList.add('invisible', 'opacity-0');
                    });
                }
            });
        });
    }
}

window.ASTooltip = new ASTooltip();
window.ASTooltip.init();
