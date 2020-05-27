import { ItemType } from "../types/types";

export let nameSort = (a: ItemType, b: ItemType) => {
  let nameA = a.text.toLowerCase();
  let nameB = b.text.toLowerCase();
  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  } else {
    return 0;
  }
};

export let dateSort = (a: ItemType, b: ItemType) => {
  return a.createDate.getTime() - b.createDate.getTime();
};

export let prioritySort = (a: ItemType, b: ItemType) => {
  return b.priority - a.priority;
};
