
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const RestaurantDetails = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [availability, setavailability] = useState(null)
  const [loadingAvailable, setloadingAvailable] = useState(false)
  const [loading,setLoading]=useState(false)
  /*
   * Temporary restaurant data.
   * Later replace this with an API request using `id`.
   */
  const [restaurant, setrestaurant] = useState([]);
const navigate = useNavigate();
    useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/restaurants/${id}/restaurant`);
        const res = await response.json();
  
        if (!response.ok) {
          throw new Error(
            res.message || "Failed to fetch the featured restaurants"
          );
        }

        setrestaurant(res);
         window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
      } catch (e) {
        console.error("Failed to fetch  restaurant by id:", e);
      }finally{
        setLoading(false)
      }
    };
  
    fetchRestaurant();
  }, []);

  /*
   * Temporary tables.
   * These will eventually come from the backend
   * based on date, time and guest count.
   */

  


  const handleReservation = () => {
    if (!date || !time || !guests ) {
      alert("Please select date, time, guests and a table.");
      return;
    }
    
navigate("/confirm-reservation", {
  state: {
      restaurantId:restaurant._id,
      name: restaurant.name,
      date,
      time,
      guests,
      location: restaurant.location,
      cuisine: restaurant.cuisine,
      image: restaurant.image,
  },
});
  }

  useEffect(()=>{
       const fetchAvailability = async ()=>{
     try {
       setloadingAvailable(true)
        const response = await fetch(`${API_URL}/restaurants/${id}/availability?date=${date}`);
        const res = await response.json();
  
        if (!response.ok) {
          throw new Error(
            res.message || "Failed to fetch the featured restaurants"
          );
        }
  
        setavailability(res);
      } catch (e) {
        console.error("Failed to fetch restaurant availability:", e);
      }finally{
        setloadingAvailable(false);
      }
  }
  if(date!=""){
   
  fetchAvailability();
  }
  },[date])
 
 
   if(!restaurant || Object.keys(restaurant).length === 0 ){
     return (
      <><div className="w-screen h-screen flex justify-center items-center">
        
      <p className="bg-white text-gray-500 text-center">restaurant not found</p>
      </div></>
     )
   }else if(loading){
    return(
      <div className="w-screen h-screen flex justify-center items-center">
        
      <Loader/>
      </div>
    )
   }else
  return (
    <main className="min-h-screen bg-white text-[#1d211d]">

     
      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-10 ">

        {/* Breadcrumb */}

        <div className="mb-7 flex items-center gap-2 text-xs text-[#858b84]">

          <Link
            to="/restaurants"
            className="transition hover:text-[#68755f]"
          >
            Restaurants
          </Link>

          <span>→</span>

          <span>{restaurant.name}</span>

        </div>

        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <div className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[430px] lg:h-[500px]">

          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {/* Image Information */}

          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#252a24]">
                ★ {restaurant.rating}
              </span>

              <span className="rounded-full bg-black/30 px-3 py-1.5 text-[10px] backdrop-blur-sm">
                {restaurant.reviewCount}
              </span>

              <span className="rounded-full bg-black/30 px-3 py-1.5 text-[10px] backdrop-blur-sm">
                {restaurant.priceRange}
              </span>

            </div>

            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {restaurant.name}
            </h1>

            <p className="mt-2 text-sm text-white/80">
              {restaurant.location}<br/>
              {restaurant.address}
            </p>

          </div>

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_410px]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section>

            {/* Restaurant Info */}

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#68755f]">
                About the restaurant
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">

                <h2 className="font-serif text-3xl text-[#20251f] sm:text-4xl">
                  {restaurant.cuisine}
                </h2>

              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#777d76]">
                {restaurant.description}
              </p>

            </div>

            {/* Restaurant Details */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#68755f] ring-1 ring-[#e8e9e4]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.2"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                      Address
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#555d53]">
                      {restaurant.address}
                    </p>
                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#68755f] ring-1 ring-[#e8e9e4]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        strokeWidth="1.7"
                      />

                      <path
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        d="M12 7v5l3 2"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                      Opening hours
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#555d53]">
                      {restaurant.availableSlots.map((slot)=>(
                        <span key={slot} className="bg-[#f7f8f5] text-[#68755f] px-2 py-1 border-1 m-[2px] rounded-full text-[10px]">
                          {slot}
                        </span>
                      ))}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Contact */}
            {restaurant?.phone || restaurant?.email &&
               <div className="mt-6 rounded-2xl border border-[#e5e7e1] bg-white p-5">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969b94]">
                    Contact
                  </p>
                  {restaurant.phone &&  <p className="mt-2 text-sm text-[#555d53]">
                    owner's phone no.{restaurant?.phone}
                  </p>}
                 {restaurant.email && <p className="mt-2 text-sm text-[#555d53]">
                    owner's email: {restaurant?.email}
                  </p> }
                 
                </div>

              </div>

            </div>
            }
         

          </section>

          {/* =================================================
              RIGHT SIDE — RESERVATION
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">

  <div className="rounded-2xl border border-[#e5e7e1] bg-[#fafbf9] p-4 shadow-sm">

    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#68755f]">
      Reserve a table
    </p>

    <h2 className="mt-2 font-serif text-2xl text-[#20251f]">
      Plan your visit
    </h2>

    <p className="mt-1 text-[11px] leading-4 text-[#858b84]">
      Choose your date, time and number of guests to see suitable tables.
    </p>

    {/* Date */}
    <div className="mt-5">
      <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
        Date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          
        }}
        min={new Date().toISOString().split("T")[0]}
        className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
      />
    </div>

    {/* Time */}
{loadingAvailable && (<>
 <div className="flex h-15 items-center justify-center">
  <Loader />
</div>
</>)}
   {availability === null ? (
  <div className="my-2 text-[12px] mr-1 text-[#636662]">
    <p>Select date to get availability</p>
  </div>
) :(<div className="mt-3">
      <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
        Time
      </label>

      <select
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
        }}
        className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
      >
        <option value="">Select time</option>

        {availability.map((slot) => (
          <option key={slot.time} value={slot.time}>
            {slot.time}
          </option>
        ))}
      </select>
    </div>)}
    
    {time && (
      availability.find((slot) => slot.time === time)?.availableSeats == 0?(<>
    <div className="my-2 text-[12px] mr-1 text-[#636662]">
    <p>Restaurant is not available for this particular time</p>
  </div>
    </>):
    (<><div className="mt-3">
  <label className="mb-1.5 block text-[11px] font-medium text-[#555d53]">
    Guests
  </label>

  <p className="mb-2 text-[11px] text-[#777d76]">
    Available seats:{" "}
    {availability.find((slot) => slot.time === time)?.availableSeats ?? 0}
  </p>

  <input
  type="number"
  min="1"
  max={availability.find((slot) => slot.time === time)?.availableSeats ?? 0}
  value={guests}
  onChange={(e) => {
    const value = e.target.value;
    const availableSeats =
      availability.find((slot) => slot.time === time)?.availableSeats ?? 0;

    if (value === "") {
      setGuests("");
      return;
    }

    const numberOfGuests = Number(value);

    if (numberOfGuests >= 1 && numberOfGuests <= availableSeats) {
      setGuests(value);
    }
  }}
  className="w-full rounded-lg border border-[#dfe2da] bg-white px-3 py-2 text-xs text-[#252a25] outline-none transition focus:border-[#68755f]"
  placeholder="Enter number of guests"
/>
</div></>))
     
   
 }
  

  


  

    {/* Summary */}
    {date && time && guests && (
      <div className="mt-4 rounded-lg bg-white p-3 ring-1 ring-[#e8e9e4]">

        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#969b94]">
          Reservation summary
        </p>

        <div className="mt-2 space-y-1.5">

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Date</span>
            <span className="font-medium text-[#30362f]">{date}</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Time</span>
            <span className="font-medium text-[#30362f]">{time}</span>
          </div>

          <div className="flex justify-between text-[10px]">
            <span className="text-[#858b84]">Seats</span>
            <span className="font-medium text-[#30362f]">{guests}</span>
          </div>

          

        </div>
      </div>
    )}

    {/* Button */}
    <button
      type="button"
       disabled={
        Boolean(
  !date || !time || !guests)
}
      onClick={handleReservation}
      className="mt-4 w-full rounded-full disabled:bg-[#a2ae9a] bg-[#68755f] py-2.5 text-xs font-semibold text-white transition hover:bg-[#56634e]"
    >
      Continue to booking
    </button>

    <p className="mt-2 text-center text-[9px] leading-3 text-[#969b94]">
      You will be able to review your reservation before confirming.
    </p>

  </div>
</aside>

        </div>

      </main>

      
    </main>
  );
};

export default RestaurantDetails;
