import '@/styles/Switch.scss';

function Switch({ onChange, text }: { onChange: Function, text: string[] }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = (e: any) => {
    setEnabled(!enabled);
    onChange(e);
  };

  return (
    <section>
		<div className="color-scheme-switch-wrapper">
			<input type="checkbox" name="color-scheme-switch" id="color-scheme-switch" className="color-scheme-switch" aria-checked="false" onChange={handleToggle}/>
			<label htmlFor="color-scheme-switch">{text[enabled ? 0 : 1]}</label>
		</div>
	</section>
  );
}


export default Switch;