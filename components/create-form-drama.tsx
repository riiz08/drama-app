import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { addToast } from "@heroui/toast";
import React, { useTransition } from "react";

import { createDrama } from "@/app/actions/drama/createDrama";

export default function CreateDramaForm() {
  type DramaStatus = "ONGOING" | "TAMAT";

  const [form, setForm] = React.useState<{
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    status: DramaStatus;
    releaseDate: string;
    isPopular: boolean;
    totalEpisode: number;
    airTime: string;
  }>({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    status: "ONGOING",
    releaseDate: "",
    isPopular: false,
    totalEpisode: 1,
    airTime: "",
  });

  const [isPending, startTransition] = useTransition();

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      [name]: name === "totalEpisode" ? parseInt(value) : value,
    }));

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
        thumbnail: `https://sadjajsd.b-cdn.net/${generateSlug(value)}/${generateSlug(value)}.png`,
      }));
    }
  };

  const handleTogglePopular = (checked: boolean) => {
    setForm((prev) => ({ ...prev, isPopular: checked }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await createDrama(form); // ini langsung server action

        if (result.error) {
          addToast({
            title: "Error",
            description: result.error,
            color: "danger",
          });
        } else {
          addToast({
            title: "Success",
            description: "Create drama successfully",
            color: "success",
          });
          setForm({
            title: "",
            slug: "",
            description: "",
            thumbnail: "",
            status: "ONGOING",
            releaseDate: "",
            isPopular: false,
            totalEpisode: 1,
            airTime: "",
          });
        }
      } catch (error) {
        addToast({
          title: "Error",
          description: "Something went wrong",
          color: "danger",
        });
      }
    });
  };

  return (
    <Form className="w-full max-w-lg space-y-4 mx-auto" onSubmit={onSubmit}>
      <Input
        isRequired
        label="Judul"
        labelPlacement="outside"
        name="title"
        placeholder="Judul drama"
        value={form.title}
        onChange={handleChange}
      />
      <Input
        isDisabled
        isRequired
        label="Slug"
        labelPlacement="outside"
        name="slug"
        placeholder="Slug unik"
        value={form.slug}
        onChange={handleChange}
      />
      <Textarea
        isRequired
        label="Deskripsi"
        labelPlacement="outside"
        name="description"
        placeholder="Sinopsis atau deskripsi drama"
        value={form.description}
        onChange={handleChange}
      />
      <Input
        isRequired
        label="URL Thumbnail"
        labelPlacement="outside"
        name="thumbnail"
        placeholder="https://example.com/thumbnail.jpg"
        value={form.thumbnail}
        onChange={handleChange}
      />
      <Input
        isRequired
        label="Total Episode"
        labelPlacement="outside"
        name="totalEpisode"
        value={String(form.totalEpisode)}
        onChange={handleChange}
      />

      <Input
        isRequired
        label="Air Time"
        labelPlacement="outside"
        name="airTime"
        value={form.airTime}
        onChange={handleChange}
      />

      <Select
        label="Status"
        labelPlacement="outside"
        name="status"
        selectedKeys={[form.status]}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            status: e.target.value as DramaStatus, // tambahkan cast
          }))
        }
      >
        <SelectItem key="ONGOING">Ongoing</SelectItem>
        <SelectItem key="TAMAT">Tamat</SelectItem>
      </Select>
      <Input
        isRequired
        label="Tanggal Rilis"
        labelPlacement="outside"
        name="releaseDate"
        type="date"
        value={form.releaseDate}
        onChange={handleChange}
      />
      <Switch
        isSelected={form.isPopular}
        name="isPopular"
        onValueChange={handleTogglePopular}
      >
        Drama Populer
      </Switch>
      <Button className="w-full" color="primary" type="submit">
        Buat Drama
      </Button>
    </Form>
  );
}
