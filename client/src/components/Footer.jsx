import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <footer className="border-t border-[#e5e7e1] bg-[#fafbf9]">

        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <Link
                to="/"
                className="font-serif text-2xl text-[#20251f]"
              >
                Book<span className="text-[#68755f]">My</span>Table
              </Link>

              <p className="mt-4 max-w-xs text-xs leading-6 text-[#858b84]">
                Discover restaurants, find your perfect
                table and make every dining experience
                memorable.
              </p>

            </div>

            {/* Company */}
            <div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#30362f]">
                Company
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  About us
                </Link>

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  Partner with us
                </Link>

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  Careers
                </Link>

              </div>

            </div>

            {/* Legal */}
            <div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#30362f]">
                Legal
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  Terms of service
                </Link>

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  Privacy policy
                </Link>

                <Link
                  to="/"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  Cookies
                </Link>

              </div>

            </div>

            {/* Contact */}
            <div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#30362f]">
                Contact
              </h3>

              <div className="mt-5 space-y-3">

                <a
                  href="mailto:support@tablely.com"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  support@tablely.com
                </a>

                <a
                  href="mailto:partners@tablely.com"
                  className="block text-xs text-[#777d76] hover:text-[#68755f]"
                >
                  partners@tablely.com
                </a>

                <p className="text-xs text-[#777d76]">
                  Belagavi, Karnataka
                </p>

              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col gap-3 border-t border-[#e5e7e1] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] text-[#969b94]">
              © 2026 Tablely. All rights reserved.
            </p>

            <p className="text-[11px] text-[#969b94]">
              Made for better dining experiences.
            </p>

          </div>

        </div>

      </footer>
  );
};

export default Footer;