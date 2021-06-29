function NavButton({label, link, className}) {
    return (
      <button className={className}>
          {label}
      </button>
    );
  }
  
  export default NavButton;