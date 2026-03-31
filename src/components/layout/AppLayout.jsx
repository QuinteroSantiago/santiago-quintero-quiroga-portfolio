import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navigation from '../Navigation';

function AppLayout() {
    return (
        <div className="min-h-screen w-full font-inter text-zinc-900 dark:text-zinc-300">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[rgba(210,153,112,0.18)] blur-3xl dark:bg-[rgba(229,174,119,0.08)]" />
                <div className="absolute right-[-5rem] top-[-2rem] h-80 w-80 rounded-full bg-[rgba(115,142,176,0.14)] blur-3xl dark:bg-[rgba(115,142,176,0.08)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-[rgba(100,76,58,0.12)]" />
            </div>

            <Navigation />
            <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
