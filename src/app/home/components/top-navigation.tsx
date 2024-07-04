
import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
} from 'react-icons/fa';


export default function TopNavigation () {
    return (
        <div className="flex flex-col bg-gray-300 dark:bg-gray-700 m-0 h-full w-full overflow-hidden;">
            <div className="flex flex-row items-center justify-evenly bg-gray-300 dark:bg-gray-700 bg-opacity-90 w-full h-16 m-0 shadow-lg">
                <HashtagIcon />
                <Title />
                <ThemeIcon />
                <Search />
                <BellIcon />
                <UserCircle />
            </div>
        </div>
    )
}

const ThemeIcon = () => {
    // const [darkTheme, setDarkTheme] = useDarkMode();
    const darkTheme = true
    // const handleMode = () => setDarkTheme(!darkTheme);
    return (
        <span>
      {darkTheme ? (
          <FaSun size='24' className='text-gray-500
    mr-3 ml-4
    transition duration-300 ease-in-out
    hover:text-pink-400
    cursor-pointer' />
      ) : (
          <FaMoon size='24' className='text-gray-500
    mr-3 ml-4
    transition duration-300 ease-in-out
    hover:text-pink-400
    cursor-pointer' />
      )}
    </span>
    );
};


const Search = () => (
    <div className='w-1/5 flex items-center justify-start
    bg-gray-400 dark:bg-gray-600
    text-gray-500
    px-2 h-9 ml-0 mr-0
    rounded-md shadow-md
    transition duration-300 ease-in-out'>
        <input className='w-full font-sans font-semibold
    bg-transparent outline-none
    text-gray-500  placeholder-gray-500
    pl-1 rounded' type='text' placeholder='Search...' />
        <FaSearch size='18' className='text-secondary my-auto' />
    </div>
);
const BellIcon = () => <FaRegBell size='24' className='text-gray-500
    mr-3 ml-4
    transition duration-300 ease-in-out
    hover:text-pink-400
    cursor-pointer' />;
const UserCircle = () => <FaUserCircle size='24' className='text-gray-500
    mr-3 ml-4
    transition duration-300 ease-in-out
    hover:text-pink-400
    cursor-pointer' />;
const HashtagIcon = () => <FaHashtag size='20' className='text-lg tracking-wider font-semibold text-gray-500
    ml-2 my-auto' />;
const Title = () => <h5 className='text-xl text-gray-500 tracking-wider font-semibold text-opacity-80
    mr-auto ml-2 my-auto
    transition duration-300 ease-in-out'>tailwind-css</h5>;