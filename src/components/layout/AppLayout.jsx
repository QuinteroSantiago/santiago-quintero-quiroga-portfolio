import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navigation from '../Navigation';

function AppLayout() {
    return (
        <div className="min-h-screen w-full font-inter text-[var(--text)]">
            <Navigation />
            <main className="relative px-5 pb-14 pt-8 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
