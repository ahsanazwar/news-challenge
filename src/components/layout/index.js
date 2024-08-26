function Layout({ children }) {
    return ( 
        <div className="flex justify-center py-20 px-6">
            <div className="container">
                {children}
            </div>
        </div>
     );
}

export default Layout;