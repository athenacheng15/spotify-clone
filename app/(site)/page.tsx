import getSongs from '@/actions/get-songs';
import Header from '@/components/header';
import ListItem from '@/components/listItem';

import PageContent from './_components/page-content';

export const revalidate = 0;

export default async function Home() {
    const songs = await getSongs();
    return (
        <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
            <Header>
                <div className=" mb-2">
                    <h1 className="text-3xl font-semibold text-white">
                        Welcome back
                    </h1>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        <ListItem
                            name="Liked Songs"
                            image="/images/liked.png"
                            href="liked"
                        />
                    </div>
                </div>
            </Header>
            <div className="mb-7 mt-2 px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">
                        Newest songs
                    </h1>
                </div>
                <PageContent songs={songs} />
            </div>
        </div>
    );
}
