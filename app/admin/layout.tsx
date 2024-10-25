import Menu from "@/components/menu.component";
import Nav from "@/components/nav.component";

export default function ProductsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <Nav />
      <div className="flex gap-3" >
      <Menu/> 
      {children}
      </div>
    </>
  );
};