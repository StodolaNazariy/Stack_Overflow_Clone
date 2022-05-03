import { useSearchParams } from 'react-router-dom';

const useQueryParams = () => {
	const [search, setSearch] = useSearchParams();
	const searchAsObject = Object.fromEntries(new URLSearchParams(search));

	return [searchAsObject, setSearch];
};

export default useQueryParams;
