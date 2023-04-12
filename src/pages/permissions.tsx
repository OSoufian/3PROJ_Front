
import '@/styles/Permissions.css';

const Permissions = () => {
  const permissions = Object.freeze({
    "read_comments":   1 << 0,
    "write_comments":  1 << 1,
    "edit_comments":   1 << 2,
    "delete_comments": 1 << 3,
    "read_chat":       1 << 4,
    "write_chat":      1 << 5,
    "edit_chat":       1 << 6,
    "delete_chat":     1 << 7,
    "read_video":      1 << 8,
    "write_video":     1 << 9,
    "edit_video":      1 << 10,
    "delete_video":    1 << 11,
    "read_channel":    1 << 12,
    "edit_channel":    1 << 13,
    "write_channel":   1 << 14,
    "delete_channel":  1 << 15,
    "read_roles":      1 << 16,
    "edit_roles":      1 << 17,
    "write_roles":     1 << 18,
    "delete_roles":    1 << 19,
    "admin":           1 << 20,
  });
  
  const [result, setResult] = useState<number>(0);

  const calculatePermissions = (role: number) => {
    setResult((role & result) === role ? result & ~role : result | role);
  };

  return (
    <div className="permissions-container">
      <h3 className="permissions-title">Calculated Permissions:</h3>
      <ul className="permissions-list">
        {Object.entries(permissions).map(([permission, value]) => (
          <li key={permission} className="permissions-list-item">
            <span className="permissions-list-item-text">{permission}</span>
            <input
              type="checkbox"
              checked={(result & value) === value}
              onChange={() => calculatePermissions(value)}
              className="permissions-checkbox"
            />
          </li>
        ))}
      </ul>
      <h1 className="permissions-result" onClick={() =>navigator.clipboard.writeText(result.toString())}>{result}</h1>
    </div>
  );
};

export default Permissions;
