import { useState } from 'react';
import { createListItem } from './services/fetch-utils';

export default function ListItemForm({ fetchItems }) {
  // you'll need to track the name and quantity in state
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();

    // make a new list item in supabase using the form values stored in state
    const newItem = {
      name: itemName,
      quantity: itemQuantity,
      has_been_bought: false,
    };

    await createListItem(newItem);

    // refetch the items using the handler functionpassed down as a prop
    await fetchItems();

    // clear the name and quantity in state to refresh the form
    await setItemQuantity(1);
    await setItemName('');
  }

  return (
    <div className="new-item-form-container">
      {/* on submit, call the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        I need . . .
        <label>
          Quantity
          {/* on change, update the quantity in state */}
          <input
            // this should be a controlled input, soi set the value based on state
            required
            value={itemQuantity}
            type="number"
            name="quantity"
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </label>
        <label>
          Name
          {/* on change, update the name in state */}
          <input
            // this should be a controlled input, soi set the value based on state
            required
            value={itemName}
            name="name"
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
        <button>Add item</button>
      </form>
    </div>
  );
}
