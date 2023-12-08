import React, { Component } from "react";
import "react-dropdown-tree-select/dist/styles.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./sectors.css";

class Sectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSectors: this.props.value || [],
    };
  }

  flattenOptions(options, selectedNodes = []) {
    return options.flatMap((option) => {
      if (option.options) {
        return [
          {
            label: option.label,
            value: option.value,
            type: "group",
            children: this.flattenOptions(option.options, selectedNodes),
          },
        ];
      } else {
        const selected = selectedNodes.some((node) => node.value === option.value);
        return [{ label: option.label, value: option.value, selected }];
      }
    });
  }

  componentDidUpdate(prevProps) {
    // Update state if the value prop changes
    if (prevProps.value !== this.props.value) {
      this.setState({ selectedSectors: this.props.value || [] });
    }
  }

  render() {
    const { onChange } = this.props;
    const sectorOptions = [
      {
        label: "Manufacturing",
        value: "Manufacturing",
        options: [
          { value: "CM", label: "Construction materials" },
          { value: "EO", label: "Electronics and optics" },
          {
            label: "Food and Beverages",
            value: "FB",
            options: [
              { value: "BP", label: "Bakery & confectionary products" },
              { value: "B", label: "Beverages" },
              { value: "FFP", label: "Fish and fish products" },
              { value: "MMP", label: "Meat and meat products" },
              { value: "MDP", label: "Milk and dairy products" },
              { value: "O1", label: "Other" },
              { value: "SSF", label: "Sweets and snack food" },
            ],
          },
          {
            label: "Furniture",
            options: [
              { value: "BS", label: "Bathroom/Sauna" },
              { value: "BR", label: "Bedroom" },
              { value: "C", label: "Childrenae" },
              { value: "K", label: "Kitchen" },
              { value: "LR", label: "Living room" },
              { value: "OF", label: "Office" },
              { value: "O2F", label: "Other(Furniture)" },
              { value: "OD", label: "Outdoor" },
              { value: "PF", label: "Project furniture" },
            ],
          },
          {
            label: "Machinery",
            options: [
              { value: "MC", label: "Machinery components" },
              { value: "ME", label: "Machinery equipments" },
              { value: "MOM", label: "Manufacture of machinery" },
              {
                label: "Maritime",
                options: [
                  { value: "ASW", label: "Aluminium and steel workboats" },
                  { value: "BYB", label: "Boat/Yatch building" },
                  { value: "SRC", label: "Ship repair and conversion" },
                ],
              },
              { value: "MS", label: "Metal structures" },
              { value: "O3", label: "Other" },
              { value: "RMS", label: "Repair and maintenance service" },
            ],
          },
          {
            label: "Metalworking",
            options: [
              { value: "CMS", label: "Construction of metal structures" },
              { value: "HAB", label: "Houses and buildings" },
              { value: "MP", label: "Metal products" },
              {
                label: "Metal works",
                options: [
                  { value: "CNM", label: "CNC-machining" },
                  { value: "FF", label: "Forging, Fasteners" },
                  { value: "GPL", label: "Gas, Plasma, Laser cutting" },
                  { value: "MTAW", label: "Mig, Tig, Aluminium welding" },
                ],
              },
            ],
          },
          {
            label: "Plastic and Rubber",
            options: [
              { value: "P", label: "Packaging" },
              { value: "PG", label: "Plastic goods" },
              {
                label: "Plastic processing technology",
                options: [
                  { value: "BL", label: "Blowing" },
                  { value: "MG", label: "Moulding" },
                  { value: "PWP", label: "Plastic welding and processing" },
                ],
              },
              { value: "PP", label: "Plastic profiles" },
            ],
          },
          {
            label: "Printing",
            options: [
              { value: "A", label: "Advertising" },
              { value: "BPP", label: "Book periodicals printing" },
              { value: "LPP", label: "Labelling and packaging printing" },
            ],
          },
          {
            label: "Textile and clothing",
            options: [
              { value: "CG", label: "Clothing" },
              { value: "T", label: "Textile" },
            ],
          },
          {
            label: "Wood",
            options: [
              { value: "04W", label: "Other(Wood)" },
              { value: "WBM", label: "Wooden building materials" },
              { value: "WH", label: "Wooden houses" },
            ],
          },
        ],
      },
      {
        label: "Other",
        options: [
          { value: "CI", label: "Creative industries" },
          { value: "ET", label: "Energy technology" },
          { value: "E", label: "Environment" },
        ],
      },
      {
        label: "Service",
        options: [
          { value: "BSS", label: "Business services" },
          { value: "EN", label: "Engineering" },
          {
            label: "Information Technology and Telecommunication",
            options: [
              {
                value: "DWE",
                label: "Data processing, Web portals, E-marketing",
              },
              { value: "PC", label: "Programming consultancy" },
              { value: "SH", label: "Software, Hardware" },
              { value: "TC", label: "Telecommunication" },
            ],
          },
          { value: "TM", label: "Tourisim" },
          { value: "TS", label: "Translation services" },
          {
            label: "Transport and lolgistics",
            options: [
              { value: "AR", label: "Air" },
              { value: "R", label: "Rail" },
              { value: "RD", label: "Road" },
              { value: "W", label: "Water" },
            ],
          },
        ],
      },
    ];

    const flattenedOptions = this.flattenOptions(sectorOptions, this.state.selectedSectors);

    const onNodeToggle = (currentNode) => {
      console.log("onNodeToggle::", currentNode);
    };

    const onFocus = () => {
      console.log("onFocus Triggered");
    };

    const onBlur = () => {
      console.log("onBlur Triggered");
    };

    return (
      <DropdownTreeSelect
        texts={{
          placeholder: "Choose all applicable sectors",
          inlineSearchPlaceholder: "Search a sector",
          noMatches: "no matches",
        }}
        keepTreeOnSearch={true}
        inlineSearchInput={true}
        clearSearchOnChange={true}
        showPartiallySelected={true}
        keepOpenOnSelect={true}
        mode="multiSelect"
        data={flattenedOptions}
        onChange={onChange}
        onNodeToggle={onNodeToggle}
        onFocus={onFocus}
        onBlur={onBlur}
        className="dropdown-select"
      />
    );
  }
}

export default Sectors;
