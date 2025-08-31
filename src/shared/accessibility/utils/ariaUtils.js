export const generateId = (prefix = 'element') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createAriaDescribedBy = (...ids) => {
  return ids.filter(Boolean).join(' ') || undefined;
};

export const createAriaLabelledBy = (...ids) => {
  return ids.filter(Boolean).join(' ') || undefined;
};

export const getAriaExpanded = (isExpanded) => {
  return isExpanded ? 'true' : 'false';
};

export const getAriaSelected = (isSelected) => {
  return isSelected ? 'true' : 'false';
};

export const getAriaChecked = (isChecked, isIndeterminate = false) => {
  if (isIndeterminate) return 'mixed';
  return isChecked ? 'true' : 'false';
};

export const getAriaInvalid = (hasError) => {
  return hasError ? 'true' : 'false';
};

export const getAriaRequired = (isRequired) => {
  return isRequired ? 'true' : undefined;
};

export const getAriaDisabled = (isDisabled) => {
  return isDisabled ? 'true' : undefined;
};

export const getRoleForElement = (elementType) => {
  const roleMap = {
    button: 'button',
    link: 'link',
    heading: 'heading',
    list: 'list',
    listitem: 'listitem',
    table: 'table',
    row: 'row',
    cell: 'cell',
    columnheader: 'columnheader',
    rowheader: 'rowheader',
    dialog: 'dialog',
    alertdialog: 'alertdialog',
    alert: 'alert',
    status: 'status',
    progressbar: 'progressbar',
    tab: 'tab',
    tablist: 'tablist',
    tabpanel: 'tabpanel',
    menu: 'menu',
    menuitem: 'menuitem',
    menubar: 'menubar',
    tooltip: 'tooltip',
    combobox: 'combobox',
    listbox: 'listbox',
    option: 'option',
    radiogroup: 'radiogroup',
    radio: 'radio',
    checkbox: 'checkbox',
    slider: 'slider',
    spinbutton: 'spinbutton',
    searchbox: 'searchbox',
    textbox: 'textbox',
  };
  
  return roleMap[elementType];
};

export const createAriaAttributes = ({
  id,
  label,
  labelledBy,
  describedBy,
  expanded,
  selected,
  checked,
  invalid,
  required,
  disabled,
  role,
  live,
  atomic,
  busy,
  current,
  hidden,
  level,
  orientation,
  valueNow,
  valueMin,
  valueMax,
  valueText,
}) => {
  const attributes = {};

  if (id) attributes.id = id;
  if (label) attributes['aria-label'] = label;
  if (labelledBy) attributes['aria-labelledby'] = createAriaLabelledBy(labelledBy);
  if (describedBy) attributes['aria-describedby'] = createAriaDescribedBy(describedBy);
  if (expanded !== undefined) attributes['aria-expanded'] = getAriaExpanded(expanded);
  if (selected !== undefined) attributes['aria-selected'] = getAriaSelected(selected);
  if (checked !== undefined) attributes['aria-checked'] = getAriaChecked(checked);
  if (invalid !== undefined) attributes['aria-invalid'] = getAriaInvalid(invalid);
  if (required !== undefined) attributes['aria-required'] = getAriaRequired(required);
  if (disabled !== undefined) attributes['aria-disabled'] = getAriaDisabled(disabled);
  if (role) attributes.role = role;
  if (live) attributes['aria-live'] = live;
  if (atomic !== undefined) attributes['aria-atomic'] = atomic ? 'true' : 'false';
  if (busy !== undefined) attributes['aria-busy'] = busy ? 'true' : 'false';
  if (current) attributes['aria-current'] = current;
  if (hidden !== undefined) attributes['aria-hidden'] = hidden ? 'true' : 'false';
  if (level) attributes['aria-level'] = level;
  if (orientation) attributes['aria-orientation'] = orientation;
  if (valueNow !== undefined) attributes['aria-valuenow'] = valueNow;
  if (valueMin !== undefined) attributes['aria-valuemin'] = valueMin;
  if (valueMax !== undefined) attributes['aria-valuemax'] = valueMax;
  if (valueText) attributes['aria-valuetext'] = valueText;

  return attributes;
};