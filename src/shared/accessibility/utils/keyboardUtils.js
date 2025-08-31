export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
};

export const isActionKey = (key) => {
  return key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE;
};

export const isNavigationKey = (key) => {
  return [
    KEYBOARD_KEYS.ARROW_UP,
    KEYBOARD_KEYS.ARROW_DOWN,
    KEYBOARD_KEYS.ARROW_LEFT,
    KEYBOARD_KEYS.ARROW_RIGHT,
    KEYBOARD_KEYS.HOME,
    KEYBOARD_KEYS.END,
    KEYBOARD_KEYS.PAGE_UP,
    KEYBOARD_KEYS.PAGE_DOWN,
  ].includes(key);
};

export const isVerticalNavigationKey = (key) => {
  return [
    KEYBOARD_KEYS.ARROW_UP,
    KEYBOARD_KEYS.ARROW_DOWN,
    KEYBOARD_KEYS.HOME,
    KEYBOARD_KEYS.END,
    KEYBOARD_KEYS.PAGE_UP,
    KEYBOARD_KEYS.PAGE_DOWN,
  ].includes(key);
};

export const isHorizontalNavigationKey = (key) => {
  return [
    KEYBOARD_KEYS.ARROW_LEFT,
    KEYBOARD_KEYS.ARROW_RIGHT,
  ].includes(key);
};

export const handleButtonKeyDown = (event, onClick) => {
  if (isActionKey(event.key)) {
    event.preventDefault();
    onClick?.(event);
  }
};

export const handleMenuKeyNavigation = (event, menuItems, currentIndex, onSelect, onClose) => {
  let newIndex = currentIndex;
  
  switch (event.key) {
    case KEYBOARD_KEYS.ARROW_DOWN:
      event.preventDefault();
      newIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
      break;
      
    case KEYBOARD_KEYS.ARROW_UP:
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
      break;
      
    case KEYBOARD_KEYS.HOME:
      event.preventDefault();
      newIndex = 0;
      break;
      
    case KEYBOARD_KEYS.END:
      event.preventDefault();
      newIndex = menuItems.length - 1;
      break;
      
    case KEYBOARD_KEYS.ENTER:
    case KEYBOARD_KEYS.SPACE:
      event.preventDefault();
      onSelect?.(menuItems[currentIndex], currentIndex);
      return currentIndex;
      
    case KEYBOARD_KEYS.ESCAPE:
      event.preventDefault();
      onClose?.();
      return currentIndex;
      
    default:
      return currentIndex;
  }
  
  return newIndex;
};

export const handleTabKeyNavigation = (event, tabs, currentIndex, onTabChange) => {
  let newIndex = currentIndex;
  
  switch (event.key) {
    case KEYBOARD_KEYS.ARROW_RIGHT:
      event.preventDefault();
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      break;
      
    case KEYBOARD_KEYS.ARROW_LEFT:
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      break;
      
    case KEYBOARD_KEYS.HOME:
      event.preventDefault();
      newIndex = 0;
      break;
      
    case KEYBOARD_KEYS.END:
      event.preventDefault();
      newIndex = tabs.length - 1;
      break;
      
    default:
      return currentIndex;
  }
  
  onTabChange?.(newIndex);
  return newIndex;
};

export const createKeyboardHandler = (keyMap) => {
  return (event) => {
    const handler = keyMap[event.key];
    if (handler) {
      handler(event);
    }
  };
};