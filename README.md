# Updates

If you feel data is out of data, incorrect, missing, or needed, please create a pull request to update the information.



# Product Matrix Data

This directory contains the markdown files that define the data for the Product Matrix feature comparison tool. The data is organized by product type, making it easy to update and maintain through GitHub or any text editor.

# Notes

- If you request to add features, you must also request to add in at least one vendor with the added feature item.  If no vendors have the feature, it will not be shown.
- Whole new product segments must be added to the core code and will not be added to the overall scope even if the markdown structure exists.

## Directory Structure

```
src/matrix/
├── rmm/                  # Remote Monitoring & Management
│   ├── features.md       # RMM-specific features
│   └── vendors/          # RMM vendor files
│       ├── connectwise.md
│       ├── kaseya.md
│       └── n-able.md
│
├── psa/                  # Professional Services Automation
│   ├── features.md       # PSA-specific features
│   └── vendors/          # PSA vendor files
│       └── connectwise.md
│
├── backup/               # Backup & Disaster Recovery (example)
│   ├── features.md       # Backup-specific features
│   └── vendors/          # Backup vendor files
│
└── README.md             # This file
```


## Managing Features

Each product type has its own `features.md` file. Features are organized by category in tables, with each category defined by a level-2 heading (##):

```markdown
## Category Name

| ID | Name | Description |
|----|------|-------------|
| feature_id | Feature Name | Description of the feature |
```

For example:

```markdown
## Architecture

| ID | Name | Description |
|----|------|-------------|
| cloud | Cloud | Cloud-based deployment option |
| on_premises | On Premises | On-premises deployment option |
```

To add a new category, simply add a new section with a level-2 heading (##) followed by the feature table.

## Managing Vendor Files

Each vendor file should include a product type identifier and can contain multiple products of that type:

```markdown
# Vendor Name
type: product_type

## Product Name
- id: product_id
- website: https://product-website.com
- defaultVisible: true/false

### Features
- feature_id1: true/false/Limited/Other value
- feature_id2: true/false/Limited/Other value
```

For example:

```markdown
# ConnectWise
type: rmm

## ConnectWise Automate
- id: connectwise_automate
- website: https://www.connectwise.com/platform/unified-management/automate
- defaultVisible: true

### Features
- cloud: true
- on_premises: true
- db_access: true
```

## Feature Values

When specifying feature values in vendor markdown files, you can use the following values:

- `true`: The feature is fully supported
- `false`: The feature is not supported
- `Limited`: The feature is supported but with limitations
- `Built-in`: The feature is built into the product
- `Integration`: The feature is available via integration with another product
- `Plugin`: The feature is available via a plugin
- `Add-on`: The feature is available as an add-on (may require additional subscription)
- Custom string: Any other custom value to describe the feature support

## Feature Notes

You can add notes to features in two ways:

1. **In the features.md file**: Add notes directly below a feature in the table by adding indented text or text starting with `>` or `-`:

```markdown
| feature_id | Feature Name | Feature Description |
> This is a note about the feature that will be displayed for all products.
> You can add multiple lines of notes.
```

2. **In vendor markdown files**: Add notes to specific feature implementations for a product:

```markdown
### Features

- feature_id: true
  > This note explains how this specific product implements the feature.
  > You can add multiple lines of notes.

- another_feature: Limited
  > This explains the limitations of this feature in this product.
```

Notes will be displayed in the feature matrix to provide additional context about features and their implementations.

## Security and Sanitization

All data from markdown files is sanitized before being displayed in the UI to prevent Cross-Site Scripting (XSS) attacks. This means that any HTML or JavaScript code included in the markdown files will be escaped and displayed as plain text rather than being executed.

When adding notes or descriptions, you should use plain text. HTML formatting will not be rendered, but line breaks in notes will be preserved for readability.

## Syncing with GitHub

To update the product matrix data:

1. Clone the repository
2. Make changes to the markdown files
3. Commit and push your changes
4. The application will load the updated data on the next deployment or refresh
