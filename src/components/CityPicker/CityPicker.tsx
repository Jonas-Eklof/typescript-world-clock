import timezoneData from "../../timezones.json";

interface CityPickerProps {
  onSelect: (timezone: string) => void;
}

export default function CityPicker({ onSelect }: CityPickerProps) {
  return (
    <div className="grid gap-4">
      {timezoneData.timezones.map((city) => (
        <div
          key={city.id}
          className="flex items-center gap-4 p-3 border rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
          onClick={() => onSelect(city.timezone)}
        >
          <img
            src={city.imageUrl}
            alt={city.name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="font-semibold">{city.name}</h3>
            <p className="text-sm text-gray-600">{city.country}</p>
            <p className="text-sm text-gray-500">{city.timezone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
