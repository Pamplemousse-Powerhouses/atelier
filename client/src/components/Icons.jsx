import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee, faCircleCheck, faMagnifyingGlass, faStar as Star, faArrowRight, faArrowLeft,
  faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faCheck, faPlus, faExpand,
  faSpinner, faXmark, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as EmptyStar, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

// Icons //////////////////////////
const iconMap = {
  Coffee: faCoffee,
  Verified: faCircleCheck,
  Search: faMagnifyingGlass,
  Star,
  EmptyStar,
  ArrowRight: faArrowRight,
  ArrowLeft: faArrowLeft,
  ChevronUp: faChevronUp,
  ChevronDown: faChevronDown,
  ChevronLeft: faChevronLeft,
  ChevronRight: faChevronRight,
  Check: faCheck,
  Exit: faCircleXmark,
  Plus: faPlus,
  Expand: faExpand,
  Loading: faSpinner,
  X: faXmark,
  MagnifyMinus: faMagnifyingGlassMinus,
  MagnifyPlus: faMagnifyingGlassPlus,
  Circle: faCircle,
};
/**
 * ### ADD ICON:
 * To add a new icon, use `iconMap` whose values are the relevant font-awesome (individual import)
 * (or any other library) icon names and whose keys are aliases.
 *
 * ### USE ICON:
 * To use the icon in react, use the notation:
 *  1. import Icons from this file
 *  2. To use an icon, for example `Coffee`, use the notation:
 *    ```
 *    <Icons.Coffee />
 *    ```
 *
 *  3. Props are supported automatically:
 *    ```
 *    <Icons.Coffee
 *      style={{ color: 'tan' }}
 *      className="some-super-cool-class"
 *      size="lg"
 *    />
 *    ```
 */
const Icons = Object.fromEntries(
  Object.entries(iconMap).map(
    ([key, value]) => [
      key,
      ({ ...props }) => <FontAwesomeIcon icon={value} title={value.iconName} {...props} />,
    ],
  ),
);
Icons.__map__ = iconMap;

export default Icons;
