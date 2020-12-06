import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppbarSearch from './AppSearch';
import SidebarContext from 'context/sidebar';

const fontSize = { fontSize: 'initial' };

export default function AppHeader() {
	const { toggle, isMobile, isOpenForMobile } = useContext(SidebarContext);
	const [isSearchShown, setIsSearchShown] = useState(false);

	const shouldShowSearch = !isMobile || isSearchShown;
	const shouldShowNav = !isMobile || !isSearchShown;
	const appBarDirection = isMobile && !isSearchShown ? 'column' : 'row';
	const headerStyle = {
		justifyContent: 'center',
		flexDirection: appBarDirection
	};

	function showSearch() {
		setIsSearchShown(true);
	}

	function hideSearch() {
		setIsSearchShown(false);
	}

	return (
		<header className="app-bar" style={headerStyle}>
			{shouldShowSearch && (
				<AppbarSearch
					onCancel={isMobile && hideSearch}
					onSearch={!isOpenForMobile && toggle}
				/>
			)}

			{shouldShowNav && (
				<nav className="app-bar-nav">
					{isMobile && <HamburgerButton onClick={toggle} />}

					<NavLink to="/notes/recent" className="app-bar-nav-link">
						Recent
					</NavLink>
					<NavLink to="/notes/most-checked" className="app-bar-nav-link">
						Most Checked
					</NavLink>

					{isMobile && (
						<button className="main-btn" onClick={showSearch} style={fontSize}>
							<span role="img" aria-label="search">
								🔍
							</span>
						</button>
					)}
				</nav>
			)}
		</header>
	);
}

function HamburgerButton({ onClick }) {
	const toggleSidebar = () => onClick();
	return (
		<button className="hamburger-button" onClick={toggleSidebar}>
			<span>|||</span>
		</button>
	);
}
