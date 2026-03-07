export default function Footer() {
  return (
    <footer className="mt-20 py-12 bg-background border-t border-primary/10 text-foreground">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">For inspirations, special offers and much more</h3>
            <div className="flex items-center space-x-4 mt-2">
              <a href="https://www.pinterest.com/" className="text-foreground/80 hover:text-primary">Pinterest</a>
              <a href="https://www.facebook.com/" className="text-foreground/80 hover:text-primary">Facebook</a>
              <a href="https://www.instagram.com/" className="text-foreground/80 hover:text-primary">Instagram</a>
              <a href="https://twitter.com/" className="text-foreground/80 hover:text-primary">Twitter</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-primary mb-2">Services</h4>
            <ul className="space-y-1 text-foreground/80">
              <li>Network Security</li>
              <li>System Administration</li>
              <li>Contact / Consultancy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-primary mb-2">Contact</h4>
            <p className="text-foreground/80">Email: <a href="mailto:zeeshan@yzinfotech.com" className="text-primary">zeeshan@yzinfotech.com</a></p>
          </div>
        </div>

        <div className="mt-8 text-sm text-foreground/60">© 2008 - 2026. All rights reserved.</div>
      </div>
    </footer>
  );
}
