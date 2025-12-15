/**
 * StepperGlass Stories
 *
 * Demonstrates the StepperGlass compound component with various configurations:
 * - Horizontal and vertical orientations
 * - Numbered, icon, and dots variants
 * - Size variations (sm, md, lg)
 * - Linear mode for sequential workflows
 * - Form wizard integration example
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StepperGlass } from './stepper-glass';
import { ButtonGlass } from './button-glass';
import { InputGlass } from './input-glass';
import { GlassCard } from './glass-card';
import { CheckCircle, User, Settings, CreditCard, Mail, Lock, Package, Truck } from 'lucide-react';

// ========================================
// META
// ========================================

const meta: Meta<typeof StepperGlass.Root> = {
  title: 'Components/Navigation/StepperGlass',
  component: StepperGlass.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Glass-themed step indicator with compound component API.

## Features
- **Orientations:** Horizontal and vertical layouts
- **Variants:** Numbered, icon, and dots styles
- **Sizes:** Small, medium, and large
- **Linear mode:** Lock future steps until previous are completed
- **Full accessibility:** Keyboard navigation, ARIA attributes, focus management

## Usage
\`\`\`tsx
<StepperGlass.Root value={step} onValueChange={setStep}>
  <StepperGlass.List>
    <StepperGlass.Step value="step1" label="Account" />
    <StepperGlass.Step value="step2" label="Profile" />
    <StepperGlass.Step value="step3" label="Complete" />
  </StepperGlass.List>
  <StepperGlass.Content value="step1">Step 1 content</StepperGlass.Content>
  <StepperGlass.Content value="step2">Step 2 content</StepperGlass.Content>
  <StepperGlass.Content value="step3">Step 3 content</StepperGlass.Content>
</StepperGlass.Root>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StepperGlass.Root>;

// ========================================
// DEFAULT (HORIZONTAL)
// ========================================

export const Default: Story = {
  render: function Render() {
    const [step, setStep] = useState('step1');

    return (
      <div className="w-[600px]">
        <StepperGlass.Root value={step} onValueChange={setStep}>
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Account" description="Create account" />
            <StepperGlass.Step value="step2" label="Profile" description="Setup profile" />
            <StepperGlass.Step value="step3" label="Complete" description="Finish setup" />
          </StepperGlass.List>
        </StepperGlass.Root>

        <div className="mt-8 flex gap-2 justify-center">
          <ButtonGlass
            variant="secondary"
            onClick={() =>
              setStep(step === 'step3' ? 'step2' : step === 'step2' ? 'step1' : 'step1')
            }
            disabled={step === 'step1'}
          >
            Back
          </ButtonGlass>
          <ButtonGlass
            variant="default"
            onClick={() =>
              setStep(step === 'step1' ? 'step2' : step === 'step2' ? 'step3' : 'step3')
            }
            disabled={step === 'step3'}
          >
            Next
          </ButtonGlass>
        </div>
      </div>
    );
  },
};

// ========================================
// VERTICAL
// ========================================

export const Vertical: Story = {
  render: function Render() {
    const [step, setStep] = useState('step2');

    return (
      <div className="w-[400px]">
        <StepperGlass.Root value={step} onValueChange={setStep} orientation="vertical">
          <StepperGlass.List>
            <StepperGlass.Step
              value="step1"
              label="Order Placed"
              description="Your order has been confirmed"
            />
            <StepperGlass.Step
              value="step2"
              label="Processing"
              description="We're preparing your items"
            />
            <StepperGlass.Step value="step3" label="Shipped" description="On the way to you" />
            <StepperGlass.Step value="step4" label="Delivered" description="Package delivered" />
          </StepperGlass.List>
        </StepperGlass.Root>
      </div>
    );
  },
};

// ========================================
// WITH ICONS
// ========================================

export const WithIcons: Story = {
  render: function Render() {
    const [step, setStep] = useState('step1');

    return (
      <div className="w-[600px]">
        <StepperGlass.Root value={step} onValueChange={setStep} variant="icon">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Account" icon={<User className="w-4 h-4" />} />
            <StepperGlass.Step
              value="step2"
              label="Settings"
              icon={<Settings className="w-4 h-4" />}
            />
            <StepperGlass.Step
              value="step3"
              label="Payment"
              icon={<CreditCard className="w-4 h-4" />}
            />
            <StepperGlass.Step
              value="step4"
              label="Complete"
              icon={<CheckCircle className="w-4 h-4" />}
            />
          </StepperGlass.List>
        </StepperGlass.Root>

        <div className="mt-8 flex gap-2 justify-center">
          <ButtonGlass
            variant="ghost"
            onClick={() => {
              const steps = ['step1', 'step2', 'step3', 'step4'];
              const idx = steps.indexOf(step);
              if (idx > 0) setStep(steps[idx - 1]);
            }}
            disabled={step === 'step1'}
          >
            Back
          </ButtonGlass>
          <ButtonGlass
            variant="default"
            onClick={() => {
              const steps = ['step1', 'step2', 'step3', 'step4'];
              const idx = steps.indexOf(step);
              if (idx < steps.length - 1) setStep(steps[idx + 1]);
            }}
            disabled={step === 'step4'}
          >
            Next
          </ButtonGlass>
        </div>
      </div>
    );
  },
};

// ========================================
// DOTS VARIANT
// ========================================

export const Dots: Story = {
  render: function Render() {
    const [step, setStep] = useState('step2');
    const steps = ['step1', 'step2', 'step3', 'step4'];
    const currentIndex = steps.indexOf(step) + 1;

    return (
      <div className="w-[400px] flex flex-col items-center gap-4">
        <StepperGlass.Root value={step} onValueChange={setStep} variant="dots">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="" />
            <StepperGlass.Step value="step2" label="" />
            <StepperGlass.Step value="step3" label="" />
            <StepperGlass.Step value="step4" label="" />
          </StepperGlass.List>
        </StepperGlass.Root>
        <p style={{ color: 'var(--text-secondary)' }}>
          Step {currentIndex} of {steps.length}
        </p>
      </div>
    );
  },
};

// ========================================
// LINEAR MODE
// ========================================

export const LinearMode: Story = {
  render: function Render() {
    const [step, setStep] = useState('step1');

    const goNext = () => {
      if (step === 'step1') setStep('step2');
      else if (step === 'step2') setStep('step3');
    };

    const goBack = () => {
      if (step === 'step3') setStep('step2');
      else if (step === 'step2') setStep('step1');
    };

    return (
      <div className="w-[600px]">
        <StepperGlass.Root value={step} onValueChange={setStep} linear>
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Email" description="Verify email" />
            <StepperGlass.Step value="step2" label="Password" description="Set password" />
            <StepperGlass.Step value="step3" label="Complete" description="All done!" />
          </StepperGlass.List>

          <div className="mt-8">
            <StepperGlass.Content value="step1">
              <GlassCard className="p-6">
                <InputGlass label="Email Address" type="email" placeholder="you@example.com" />
              </GlassCard>
            </StepperGlass.Content>
            <StepperGlass.Content value="step2">
              <GlassCard className="p-6">
                <InputGlass label="Password" type="password" placeholder="Enter password" />
              </GlassCard>
            </StepperGlass.Content>
            <StepperGlass.Content value="step3">
              <GlassCard className="p-6 text-center">
                <CheckCircle
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: 'var(--status-online)' }}
                />
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Account Created!
                </h3>
              </GlassCard>
            </StepperGlass.Content>
          </div>
        </StepperGlass.Root>

        <div className="mt-6 flex gap-2 justify-between">
          <ButtonGlass variant="ghost" onClick={goBack} disabled={step === 'step1'}>
            Back
          </ButtonGlass>
          <ButtonGlass variant="default" onClick={goNext} disabled={step === 'step3'}>
            {step === 'step2' ? 'Complete' : 'Next'}
          </ButtonGlass>
        </div>
      </div>
    );
  },
};

// ========================================
// SIZES
// ========================================

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12 w-[500px]">
      <div>
        <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Small
        </p>
        <StepperGlass.Root value="step2" size="sm">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Step 1" />
            <StepperGlass.Step value="step2" label="Step 2" />
            <StepperGlass.Step value="step3" label="Step 3" />
          </StepperGlass.List>
        </StepperGlass.Root>
      </div>

      <div>
        <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Medium (default)
        </p>
        <StepperGlass.Root value="step2" size="md">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Step 1" />
            <StepperGlass.Step value="step2" label="Step 2" />
            <StepperGlass.Step value="step3" label="Step 3" />
          </StepperGlass.List>
        </StepperGlass.Root>
      </div>

      <div>
        <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Large
        </p>
        <StepperGlass.Root value="step2" size="lg">
          <StepperGlass.List>
            <StepperGlass.Step value="step1" label="Step 1" />
            <StepperGlass.Step value="step2" label="Step 2" />
            <StepperGlass.Step value="step3" label="Step 3" />
          </StepperGlass.List>
        </StepperGlass.Root>
      </div>
    </div>
  ),
};

// ========================================
// ORDER TRACKING (VERTICAL WITH ICONS)
// ========================================

export const OrderTracking: Story = {
  render: function Render() {
    const [step] = useState('step3');

    return (
      <div className="w-[350px]">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Order #12345
          </h3>
          <StepperGlass.Root value={step} orientation="vertical" variant="icon">
            <StepperGlass.List>
              <StepperGlass.Step
                value="step1"
                label="Order Confirmed"
                description="Dec 10, 2024"
                icon={<CheckCircle className="w-4 h-4" />}
              />
              <StepperGlass.Step
                value="step2"
                label="Packed"
                description="Dec 11, 2024"
                icon={<Package className="w-4 h-4" />}
              />
              <StepperGlass.Step
                value="step3"
                label="In Transit"
                description="Expected Dec 14"
                icon={<Truck className="w-4 h-4" />}
              />
              <StepperGlass.Step
                value="step4"
                label="Delivered"
                description="Pending"
                icon={<CheckCircle className="w-4 h-4" />}
              />
            </StepperGlass.List>
          </StepperGlass.Root>
        </GlassCard>
      </div>
    );
  },
};

// ========================================
// FORM WIZARD INTEGRATION
// ========================================

export const FormWizardIntegration: Story = {
  render: function Render() {
    const [step, setStep] = useState('account');

    return (
      <div className="w-[700px]">
        <GlassCard className="p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Create Account
          </h2>

          <StepperGlass.Root value={step} onValueChange={setStep} linear variant="icon">
            <StepperGlass.List>
              <StepperGlass.Step
                value="account"
                label="Account"
                description="Email & password"
                icon={<Mail className="w-4 h-4" />}
              />
              <StepperGlass.Step
                value="profile"
                label="Profile"
                description="Personal info"
                icon={<User className="w-4 h-4" />}
              />
              <StepperGlass.Step
                value="security"
                label="Security"
                description="2FA setup"
                icon={<Lock className="w-4 h-4" />}
              />
            </StepperGlass.List>

            <div className="mt-8 space-y-4">
              <StepperGlass.Content value="account">
                <InputGlass
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  className="mb-4"
                />
                <InputGlass label="Password" type="password" placeholder="Enter password" />
              </StepperGlass.Content>

              <StepperGlass.Content value="profile">
                <InputGlass label="Full Name" placeholder="John Doe" className="mb-4" />
                <InputGlass label="Company" placeholder="Acme Inc." />
              </StepperGlass.Content>

              <StepperGlass.Content value="security">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Two-factor authentication will be set up after account creation.
                </p>
              </StepperGlass.Content>
            </div>
          </StepperGlass.Root>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between">
            <ButtonGlass
              variant="ghost"
              onClick={() => setStep(step === 'security' ? 'profile' : 'account')}
              disabled={step === 'account'}
            >
              Back
            </ButtonGlass>
            <ButtonGlass
              variant="default"
              onClick={() => setStep(step === 'account' ? 'profile' : 'security')}
            >
              {step === 'security' ? 'Create Account' : 'Continue'}
            </ButtonGlass>
          </div>
        </GlassCard>
      </div>
    );
  },
};
