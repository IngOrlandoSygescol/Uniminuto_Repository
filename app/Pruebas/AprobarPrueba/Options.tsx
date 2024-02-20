
export interface Person {
  first_name: string;
  last_name: string;
  fullName: string;
  slug: string;
}

export const options = {
  trigger: "@",
  values: [
    {
      key: "1",
      first_name: "Delia",
      last_name: "Manea",
      fullName: "Delia Manea",
      slug: "deliamanea",
    },
    {
      key: "2",
      first_name: "Greg",
      last_name: "Forel",
      fullName: "Greg Forel",
      slug: "gregforel",
    },
  ],
  lookup: (user: Person) => user.first_name + " " + user.last_name,
  fillAttr: "fullName",
  allowSpaces: true,
  selectTemplate: function (item: any) {
    return `@${item.original.fullName}`;
  },
};
