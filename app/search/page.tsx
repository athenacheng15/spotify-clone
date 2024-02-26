import getSongsByTitle from '@/actions/get-songs-by-title';
import Header from '@/components/header';
import SearchInput from '@/components/search-input';

interface SearchProps {
    searchParams: {
        title: string;
    };
}

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="h-full w-full overflow-hidden overflow-y-hidden rounded-lg bg-neutral-900">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
        </div>
    );
};

export default Search;
