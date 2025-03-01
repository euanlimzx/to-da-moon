import Button from "@/components/button";
export default function Dashboard({ buttonFn }: { buttonFn: () => void }) {
  return (
    <div className="fixed">
      <Button buttonFn={buttonFn} />
    </div>
  );
}
