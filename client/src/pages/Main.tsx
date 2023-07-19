import ChecklistContainer from "../components/ChecklistContainer";
import ChecklistForm from "../components/ChecklistForm";

function Main() {
  return (
    <div className="home-container">
      <ChecklistForm />
      <ChecklistContainer />
    </div>
  );
}

export default Main;
