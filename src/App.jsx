import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { Container } from "react-bootstrap";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./components/SortableItem";

function App() {
  const [languages, setLanguages] = useState(["Javascript", "PHP", "Python"]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className="p-3" style={{"width": "50%"}} align="center">
        <h4>The best programming languages!</h4>
        <SortableContext items={languages} strategy={verticalListSortingStrategy}>
          {
            languages.map((language) => <SortableItem key={language} id={language} />)
          }
        </SortableContext>
      </Container>
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log("Drag end Called");
    const {active, over} = event;

    if(active.id !== over.id){
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);

        return arrayMove(items, activeIndex, overIndex);
      })
    }
  }
}

export default App;
