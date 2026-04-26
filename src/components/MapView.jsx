export default function MapView({ location }) {
  const query = encodeURIComponent(location);

  return (
    <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-md">

      <iframe
        title="map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="border-0"
      ></iframe>

    </div>
  );
}