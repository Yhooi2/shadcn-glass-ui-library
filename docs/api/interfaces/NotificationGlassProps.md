[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / NotificationGlassProps

# Interface: NotificationGlassProps

Defined in: [src/components/glass/ui/notification-glass.tsx:37](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L37)

## Extends

- `Omit`\<`React.HTMLAttributes`\<`HTMLDivElement`\>, `"title"` \| `"style"`\>.`VariantProps`\<*typeof* [`notificationVariants`](../variables/notificationVariants.md)\>

## Properties

### title

> `readonly` **title**: `string`

Defined in: [src/components/glass/ui/notification-glass.tsx:40](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L40)

***

### message

> `readonly` **message**: `string`

Defined in: [src/components/glass/ui/notification-glass.tsx:41](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L41)

***

### variant?

> `readonly` `optional` **variant**: `"default"` \| `"destructive"` \| `"success"` \| `"warning"`

Defined in: [src/components/glass/ui/notification-glass.tsx:43](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L43)

Notification variant (shadcn/ui compatible)

***

### ~~type?~~

> `readonly` `optional` **type**: [`NotificationType`](../type-aliases/NotificationType.md)

Defined in: [src/components/glass/ui/notification-glass.tsx:45](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L45)

#### Deprecated

Use variant prop instead. Will be removed in next major version.

#### Overrides

`VariantProps.type`

***

### onClose()

> `readonly` **onClose**: () => `void`

Defined in: [src/components/glass/ui/notification-glass.tsx:46](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/notification-glass.tsx#L46)

#### Returns

`void`
