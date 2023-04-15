import "@/styles/CategoryPanel.css";
import { type VideoType } from '@/types';

interface Category {
  id: number;
  name: string;
}

interface CategoryPanelProps {
  onFilterChange: (filteredVideos: VideoType[]) => void;
  video: VideoType[];
}

function CategoryPanel({ onFilterChange, video }: CategoryPanelProps) {
  const categories = [
    {id: 1, name: "Musique"},
    {id: 2, name: "Jeux vidéos"},
    {id: 3, name: "Manga"},
    {id: 4, name: "Comédie"}
  ]

  const [activeCategory, setActiveCategory] = useState(0);
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
    // const filtered = 
    // setFilteredVideos(filtered);
    // onFilterChange(filtered);
  };

  return (
    <div className='panel'>
      <div className='container'>
      <ul>
        {categories.map((category) => (
          // <Link key={category.id} to={`/category/${category.id}`} className={`item${activeCategory === category.id ? ' active' : ''}`} onClick={() => handleCategoryClick(category)}>
          <Link key={category.id} to={``} className={`item${activeCategory === category.id ? ' active' : ''} dark:text-#C2C2C2`} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </Link>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryPanel;