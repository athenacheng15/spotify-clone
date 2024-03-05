import Header from '@/components/header';
import AccountContent from './_components/account-content';

const Account = () => {
    return (
        <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
            <Header className="from-bg-netural-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Account Setting
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    );
};

export default Account;
