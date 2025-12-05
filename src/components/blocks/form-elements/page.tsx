// ========================================
// FORM ELEMENTS BLOCK
// Demo showcase of form input components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { InputGlass } from '@/components/glass/ui/input-glass';
import { SliderGlass } from '@/components/glass/ui/slider-glass';
import { ToggleGlass } from '@/components/glass/ui/toggle-glass';
import { CheckboxGlass } from '@/components/glass/ui/checkbox-glass';
import '@/glass-theme.css';

export interface FormElementsBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const FormElementsBlock = forwardRef<HTMLDivElement, FormElementsBlockProps>(
  ({ showTitle = true, className, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [toggleValue, setToggleValue] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);

    return (
      <GlassCard
        ref={ref}
        className={cn('p-6', className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        {showTitle && (
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Form Elements
          </h2>
        )}

        <div className="space-y-6">
          {/* Input Demo */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Text Input
            </label>
            <InputGlass
              placeholder="Enter your name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Slider Demo */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center justify-between"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span>Slider</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {sliderValue}%
              </span>
            </label>
            <SliderGlass
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
            />
          </div>

          {/* Toggle Demo */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Toggle Switch
            </label>
            <ToggleGlass checked={toggleValue} onChange={setToggleValue} />
          </div>

          {/* Checkbox Demo */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <CheckboxGlass checked={checkboxValue} onChange={setCheckboxValue} />
              <span>Accept terms and conditions</span>
            </label>
          </div>
        </div>
      </GlassCard>
    );
  }
);

FormElementsBlock.displayName = 'FormElementsBlock';
