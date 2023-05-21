import React, { useState } from "react";
import "./styles.css";


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const [search, setSearch] = useState("");

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <table>
      <caption>Products</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("price")}
              className={getClassNamesFor("price")}
            >
              Price
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("stock")}
              className={getClassNamesFor("stock")}
            >
              In Stock
            </button>
          </th>
          <th>
            <th>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
            </th>
          </th>
        </tr>
      </thead>
      <tbody>
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <ProductTable
        products={[
          { id: 1, name: "Cheese", price: 4.9, stock: 20 },
          { id: 2, name: "Milk", price: 1.9, stock: 32 },
          { id: 3, name: "Yoghurt", price: 2.4, stock: 12 },
          { id: 4, name: "Heavy Cream", price: 3.9, stock: 9 },
          { id: 5, name: "Butter", price: 0.9, stock: 99 },
          { id: 6, name: "Sour Cream ", price: 2.9, stock: 86 },
        ]}
      />
    </div>
  );
}
