[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / TabsGlass

# Variable: TabsGlass

> `const` **TabsGlass**: `object`

Defined in: [src/components/glass/ui/tabs-glass.tsx:325](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/tabs-glass.tsx#L325)

TabsGlass - Compound Component API

## Type Declaration

### Root

> **Root**: `FC`\<`TabsRootProps`\> = `TabsRoot`

### List

> **List**: `ForwardRefExoticComponent`\<`TabsListProps` & `RefAttributes`\<`HTMLDivElement`\>\> = `TabsList`

### Trigger

> **Trigger**: `ForwardRefExoticComponent`\<`TabsTriggerProps` & `RefAttributes`\<`HTMLButtonElement`\>\> = `TabsTrigger`

### Content

> **Content**: `FC`\<`TabsContentProps`\> = `TabsContent`

## Example

```tsx
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Overview</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Analytics</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">
    <p>Overview content</p>
  </TabsGlass.Content>
  <TabsGlass.Content value="tab2">
    <p>Analytics content</p>
  </TabsGlass.Content>
</TabsGlass.Root>
```

## Since

v1.0.0 - Legacy API removed (tabs/activeTab/onChange props)
