//temp button, can delete
export default function Button({ buttonFn }: { buttonFn: () => void }) {
    return (
        <button className="bg-white text-black" onClick={buttonFn}>
            Click me
        </button>
    )
}
