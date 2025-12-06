[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / FormFieldWrapper

# Variable: FormFieldWrapper

> `const` **FormFieldWrapper**: `ForwardRefExoticComponent`\<`FormFieldWrapperProps` & `RefAttributes`\<`HTMLDivElement`\>\>

Defined in: [src/components/glass/primitives/form-field-wrapper.tsx:89](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/primitives/form-field-wrapper.tsx#L89)

FormFieldWrapper component

Provides consistent structure for form fields with labels and validation messages.
Used by InputGlass, SliderGlass, and other form components.

## Example

```tsx
// Basic usage
<FormFieldWrapper label="Email" htmlFor="email-input">
  <input id="email-input" type="email" />
</FormFieldWrapper>

// With validation
<FormFieldWrapper
  label="Username"
  error="Username is required"
  required
  htmlFor="username"
>
  <input id="username" />
</FormFieldWrapper>

// Success state
<FormFieldWrapper
  label="Password"
  success="Strong password"
  htmlFor="password"
>
  <input id="password" type="password" />
</FormFieldWrapper>
```
