import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { usePersistantState } from '../../util/persistant-state'
import { Note } from '../Sidebar/Note'
import { Title } from '../Sidebar/Title'
import { SelectId, SelectIdProps } from './SelectId'

export default function TextGrid (props) {
  console.log("TextGrid:PROPS",props);
  const {
    options,
    setPreviewNode,
    previewNode,
    nodeById,
    nodeByCite,
    setSidebarHighlightedNode,
    linksByNodeId,
    openContextMenu,
    macros,
    attachDir,
    useInheritance,
  } = props;
  console.log("TextGrid:NodeById",nodeById);
  const [ layout, setLayout ] = useState<Layout>([]);
  const [ counter, setCounter ] = useState(0);
  const [justification, setJustification] = usePersistantState('justification', 1)
  const [outline, setOutline] = usePersistantState('outline', false)
  const justificationList = ['justify', 'start', 'end', 'center']
  //const [font, setFont] = useState('sans serif')
  //const [indent, setIndent] = useState(0)
  const [collapse, setCollapse] = useState(false)

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el} className="card">
        <div
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(i)}
        >
          x
        </div>
        <Title previewNode={nodeById[i]} />
        <Note
          setPreviewNode={setPreviewNode}
          justificationList={justificationList}
          justification={justification}
          previewNode={nodeById[i]} 
          nodeById
          nodeByCite={nodeByCite}
          setSidebarHighlightedNode={setSidebarHighlightedNode}
          linksByNodeId={linksByNodeId}
          openContextMenu={openContextMenu}
          outline={outline}
          collapse={collapse}
          macros={macros}
          attachDir={attachDir}
          useInheritance={useInheritance}
        />
      </div>
    );
  }

  const onAddItem = (id) => {
    /*eslint no-console: 0*/
    console.log("adding", id);
    console.log(layout)
    setLayout(
      // Add a new item. It must have a unique key!
      (layout as Array).concat({
        i: id,
        x: (layout.length * 2) % (props.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
    );
  }

  const onLayoutChange = (layout) => {
    console.log("PROPS:",props)
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onRemoveItem = (i) => {
    console.log("removing", i);
    console.log(counter,layout);
    setLayout((layout as Array).filter((item) => item.i !== i));
    setCounter(counter - 1);
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  const [selectedItems, setSelectedItems] = useState<typeof optionArray>([])
  const onSelectedItemsChange = (changes,selectedItems) => {
    console.debug("SELECTED-OLD:", selectedItems)
    console.debug("SELECTED-NEW:", changes.selectedItems)
    const selectedIds = changes.selectedItems.map((item) => item.value)
    const layoutIds = layout.map((l) => l.i)
    console.debug("S-ids",selectedIds)
    console.debug("L-ids",layoutIds)
    var id
    for (id of selectedIds) {
      if (!layoutIds.includes(id))
      {console.debug("NOT-INCLUDED:",id)
        onAddItem(id)
      }
    }
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems)
      //          setFilter({ ...filter, [listName]: changes.selectedItems.map((item) => item.value) })
    }
  }

  const onRestart = () => {
    setSelectedItems([])
    setLayout([])
  }

  return (
    <div>
      <button onClick={onRestart}>Очистить</button>
      <SelectId options={options}
                selectedItems={selectedItems}
                onSelectedItemsChange={onSelectedItemsChange} />
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={300}
        width={1000}
        containerPadding={[20,20]}
        //compactType={null}
        isDroppable={true}
        onLayoutChange={onLayoutChange}
        {...props}
      >
        {layout.map(el => createElement(el))}
      </GridLayout>
    </div>
  );
};
