import Header from "../components/Header";

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
         <Header />
        {children}
      </div>
    );
  }