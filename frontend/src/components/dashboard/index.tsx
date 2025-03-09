import Button from "@/components/button";
import Object from "@/components/object";

export default function Dashboard({ buttonFn }: { buttonFn: () => void }) {
  return (
    <div className="fixed">
      <Button buttonFn={buttonFn} />
      <Object />
    </div>
  );
}
