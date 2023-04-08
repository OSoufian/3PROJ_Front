import "@/styles/CategoryPanel.css"
// import { getCategoryList } from '../api/categories';

function CategoryPanel() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     getCategoryList().then(data => {
//       setCategories(data);
//     });
//   }, []);
const categories = [{id: 1, name: "Lounes"},{id: 2, name: "Soufian"},{id: 3, name: "Cyp"},{id: 4, name: "Tous"}]
  return (
    <div className='panel'>
      <h3>Categories</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <a href={`/category/${category.id}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPanel;