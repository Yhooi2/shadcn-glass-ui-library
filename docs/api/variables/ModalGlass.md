[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / ModalGlass

# Variable: ModalGlass

> `const` **ModalGlass**: `object`

Defined in: [src/components/glass/ui/modal-glass.tsx:514](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/modal-glass.tsx#L514)

ModalGlass - Compound Component API

## Type Declaration

### Root

> **Root**: `FC`\<`ModalRootProps`\> = `ModalRoot`

### Overlay

> **Overlay**: `FC`\<`ModalOverlayProps`\> = `ModalOverlay`

### Content

> **Content**: `ForwardRefExoticComponent`\<`ModalContentProps` & `RefAttributes`\<`HTMLDivElement`\>\> = `ModalContent`

### Header

> **Header**: `FC`\<`ModalHeaderProps`\> = `ModalHeader`

### Body

> **Body**: `FC`\<`ModalBodyProps`\> = `ModalBody`

### Footer

> **Footer**: `FC`\<`ModalFooterProps`\> = `ModalFooter`

### Title

> **Title**: `FC`\<`ModalTitleProps`\> = `ModalTitle`

### Description

> **Description**: `FC`\<`ModalDescriptionProps`\> = `ModalDescription`

### Close

> **Close**: `FC`\<`ModalCloseProps`\> = `ModalClose`

## Example

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Confirm</ModalGlass.Title>
      <ModalGlass.Description>Are you sure?</ModalGlass.Description>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>
      <p>Body content</p>
    </ModalGlass.Body>
    <ModalGlass.Footer>
      <ButtonGlass>Cancel</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```
