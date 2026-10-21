---
name: STRUCTUM Desktop Enterprise
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff3ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fd'
  surface-container-highest: '#d9e3f7'
  on-surface: '#121c2a'
  on-surface-variant: '#43474e'
  inverse-surface: '#273140'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f87'
  primary: '#022448'
  on-primary: '#ffffff'
  primary-container: '#1e3a5f'
  on-primary-container: '#8aa4cf'
  inverse-primary: '#adc8f5'
  secondary: '#335e9f'
  on-secondary: '#ffffff'
  secondary-container: '#8fb7fd'
  on-secondary-container: '#154786'
  tertiary: '#002447'
  on-tertiary: '#ffffff'
  tertiary-container: '#003a6b'
  on-tertiary-container: '#5aa6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#adc8f5'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#2d486d'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#aac7ff'
  on-secondary-fixed: '#001b3e'
  on-secondary-fixed-variant: '#144685'
  tertiary-fixed: '#d3e3ff'
  tertiary-fixed-dim: '#a3c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004883'
  background: '#f9f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f7'
typography:
  headline-lg:
    fontFamily: Segoe UI
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  headline-md:
    fontFamily: Segoe UI
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  headline-sm:
    fontFamily: Segoe UI
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  body-lg:
    fontFamily: Segoe UI
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-md:
    fontFamily: Segoe UI
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  body-sm:
    fontFamily: Segoe UI
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  label-lg:
    fontFamily: Segoe UI
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-md:
    fontFamily: Segoe UI
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  label-sm:
    fontFamily: Segoe UI
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: Consolas
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
spacing:
  gutter: 0.5rem
  margin: 0.5rem
  space-xs: 0.125rem
  space-sm: 0.25rem
  space-md: 0.5rem
  space-lg: 0.75rem
  space-xl: 1rem
---

## Brand & Style

STRUCTUM is engineered as a mission-critical, dense Windows desktop application rooted in the high-reliability aesthetics of Microsoft WPF, Avalonia UI Fluent, and Microsoft Office Fluent Ribbon architectures. Tailored for analytical enterprise operators, engineers, and corporate administrators, the interface conveys precision, institutional authority, and computational efficiency. 

The aesthetic is strictly native desktop:
- **High Information Density**: No oversized cards, no vacuous mobile-first margins, and no floating pill layouts. Space is treated as an operational asset.
- **Structural Chrome & Hierarchy**: Native window title bars with standard minimize/maximize/close actions, a persistent Quick Access Toolbar (QAT), a comprehensive functional Ribbon container, multi-pane docking splitters, and an omnipresent system StatusBar.
- **Durable Enterprise Precision**: Strict visual compartments delineated through subtle hairline dividers, recessed panels, muted alternating row surfaces, and tactile, low-radius interactive boundaries.

## Colors

The palette establishes an authoritative, fatigue-reducing environment for intensive multi-hour desktop workflows, utilizing corporate slate, petroleum blue, and standard Microsoft Fluent operational accents.

### Core Swatches
- **Primary (`#1E3A5F`)**: Deep petroleum blue. Serves as the anchor for window headers, active ribbon tabs, primary command buttons, and major framing borders.
- **Secondary (`#2B5797`)**: Classic Office navy. Applied to focused states, ribbon accent bars, key column headers, and active navigation items.
- **Tertiary (`#0078D4`)**: Standard fluent interactive blue. Used for keyboard focus rectangles, active selection halos, and ongoing analysis indicators.
- **Neutral Surface & Boundaries**:
  - Window Chrome & App Workspace: `#E5E7EB`
  - Ribbon Canvas & Container Background: `#F3F4F6`
  - Control Backgrounds (Inputs, Grid cells): `#FFFFFF`
  - Structural Borders & Hairlines: `#D1D5DB`
  - High-Contrast Text: `#111827`
  - Regular Text / Secondary Labels: `#374151`
  - Disabled Text: `#9CA3AF`

### Operational Status Tokens
- **Concluído (Success)**: `#107C41` (Excel Forest Green)
- **Em Análise (In Review)**: `#0078D4` (Fluent Inspection Blue)
- **Pendente (Warning / Attention)**: `#C19C00` / `#D83B01` (Amber / Office Ochre)
- **Cancelado / Erro (Critical)**: `#D13438` (System Crimson)

## Typography

The typography is built around native Windows system font stacks (`Segoe UI`, `Aptos`, or fallback `Tahoma`/system-ui) configured for high screen density and legibility at sub-pixel render tiers (ClearType).

- **Strict Desktop Sizing**: Base text scales between 11px and 12px for maximum data per square inch. DataGrid entries and form labels use 11px/12px to maintain dense, scannable structures.
- **Vertical Tightness**: Line heights are restricted strictly to 1.2–1.3x font size to prevent artificial vertical sprawling within rows, lists, and tool strips.
- **Tabular Numerals**: Numerical data presented in financial/technical grid columns must mandate `font-variant-numeric: tabular-nums` to guarantee vertical decimal alignment across multi-row datasets.

## Layout & Spacing

STRUCTUM rejects responsive web grid philosophies in favor of an explicit Windows Desktop docked layout architecture:

### Structural Frame Composition
1. **Window Title Bar (32px fixed height)**: Houses window icon, application name (`STRUCTUM`), active document/record, search bar center-docked, and Window state glyphs (Minimize, Maximize/Restore, Close).
2. **Quick Access Toolbar (QAT) & Ribbon Header (26px height)**: Integrated tab controls (`Início`, `Laudos`, `Clientes`, `Relatórios`, `Administração`).
3. **Ribbon Control Bar (94px fixed height)**: Multi-column functional tool groupings with 1px vertical borders (`#D1D5DB`) separating context clusters. Group label centered at bottom in 10px type.
4. **Docking Workspace / Client Area (Variable)**: Composed of `DockPanel` and `GridSplitter` panes with zero gratuitous margin padding. Side navigation or filter panes utilize fixed 240px-320px widths with collapsible splitters.
5. **StatusBar / StatusStrip (24px fixed height)**: Bottom-docked diagnostic strip split into discrete panels: Current Company, Active User, Connection Mode (`ONLINE - TCP/TLS`), Latency, and Application Version.

### Density and Padding
- **Cell Spacing**: DataGrid cells feature 4px horizontal padding and 2px vertical padding.
- **Form Controls**: Horizontal gap between label and control is 6px; vertical stacked fields maintain an 8px rhythm.

## Elevation & Depth

Visual depth is communicated through authentic native desktop mechanisms: 1px precision borders, recessed sunken wells, and bevel states rather than soft drop shadows.

- **Level 0 (App Canvas / Panes)**: Solid background `#E5E7EB`.
- **Level 1 (Client Work Area / DataGrid / Input Wells)**: Recessed `#FFFFFF` surface framed by an inset or 1px hairline border of `#D1D5DB`.
- **Level 2 (Hover / Ribbon Dropdowns / Tooltips)**: Elevated with a 1px solid border (`#9CA3AF`) paired with a minimal native desktop shadow (`0 2px 4px rgba(0, 0, 0, 0.12)`).
- **Pressed & Inset States**: Data input fields, active splitter handles, and pressed ribbon toggle buttons render an interior 1px stroke or recessed tint (`#E5E7EB`) to visually signify physical depression.
- **Focus Indicators**: 1px dashed or solid `#0078D4` outline positioned 1px inside the control border, preserving accessibility without altering layout geometry.

## Shapes

To honor classic Windows Presentation Foundation (WPF) and Avalonia enterprise aesthetics, the shape language uses strict square geometries.

- **Primary Geometry (`roundedness: 0`)**: Windows, tabs, DataGrid cells, StatusStrip panels, GroupBoxes, and Ribbon control containers possess 0px border-radii. 
- **Subtle Surface Controls**: Buttons, text inputs, combo boxes, and check/radio hitboxes permit a maximum corner radius of 2px (`rounded-xs`) only when operating in the modern Avalonia/Fluent theme toggle; standard production default remains crisp 0px square corners.

## Components

### Ribbon Control Bar & Tool Groups
- **Ribbon Container**: Height locked to 94px, background `#F3F4F6`, bottom border 1px solid `#D1D5DB`.
- **Ribbon Tabs**: Inactive tabs render in `#374151` with no background; active tab renders `#1E3A5F` top accent border (3px), `#FFFFFF` body background, and crisp left/right boundaries.
- **Large Ribbon Button**: 42px x 68px footprint. 32px x 32px icon centered above, 11px label centered below. Hover applies `#E5E7EB` with 1px border `#D1D5DB`.
- **Small Button & Split-Button**: 22px height. 16px icon paired horizontally with text. Split buttons feature a right-docked 12px dropdown arrow container divided by a hairline stroke.
- **Tool Group Separators**: 1px vertical divider (`#D1D5DB`) spanning 70% height with group label centered along the bottom.

### WPF DataGrid
- **Row Metrics**: Uniform 28px standard row height (dense mode: 24px).
- **Header Row**: 30px height, gradient or flat `#E5E7EB` fill, 1px bottom border `#9CA3AF`. Column headers feature resizable grippers, sort glyph indicators (▲ / ▼), and interactive funnel filter icons on hover.
- **Row Shading**: Odd rows `#FFFFFF`, even rows `#F9FAFB`. Selected row: `#CCE8FF` with 1px dotted `#0078D4` focus bounding box; text remains `#111827`. Hovered row: `#E5F1FB`.
- **Cell Editors**: Double-click transforms cell immediately into inline text box, combo box, or date picker with 0px margin, occupying exact cell bounds.
- **Row Selectors**: 24px width left-hand column containing record indicator arrow (`►`) for the current active record.

### GroupBox & TabControl
- **GroupBox**: Surrounding 1px solid border (`#D1D5DB`) with legend header text nested across the top-left boundary, styled in 11px bold `#1E3A5F`. Content has 8px inner padding.
- **TabControl (Docked)**: Bottom or top border line 1px solid `#D1D5DB`. Inactive tab `#E5E7EB`; selected tab `#FFFFFF` connected seamlessly with the client area canvas.

### Inputs & Form Controls
- **TextBox / NumericUpDown**: 24px height, `#FFFFFF` background, 1px border `#D1D5DB`. Focus introduces 1px outline `#0078D4`. Text vertically centered with 4px horizontal padding.
- **ComboBox**: 24px height, integrated right chevron trigger button (18px width), flat drop panel showing up to 12 items with native scrollbar.
- **CheckBox & RadioButton**: 14px x 14px square check indicator with 1px border `#9CA3AF`. Checked state uses `#1E3A5F` fill with crisp white vector checkmark.

### StatusBar / StatusStrip
- **Height**: 24px, docked to bottom window edge. Background `#1E3A5F`, text `#FFFFFF`.
- **Panels**: Divided using subtle recessed vertical borders (`#2B5797`).
  - Panel 1 (Flexible): Operational state text (e.g., "Pronto", "Processando 1.420 registros...").
  - Panel 2 (Auto): Active Entity/Company Name.
  - Panel 3 (Auto): Operator Login Name.
  - Panel 4 (Auto): Server Connection & Ping Indicator (`TCP 127.0.0.1:8080 - 12ms`).
  - Panel 5 (Auto): Product Release Version (`STRUCTUM v4.12.0`).