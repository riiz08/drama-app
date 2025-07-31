"use client";

import { useState, useEffect, useTransition } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";

import { createEpisode } from "@/app/actions/episode/createEpisode";
import { getAllDramas } from "@/app/actions/drama/getAllDramas";
import { Drama } from "@/app/generated/prisma";

export default function CreateEpisodeForm() {
  const [form, setForm] = useState({
    slug: "",
    episodeNum: 1,
    videoUrl: "",
    releaseDate: "",
    dramaId: "",
  });

  const [dramas, setDramas] = useState<Drama[]>([]);
  const [selectedDramaTitle, setSelectedDramaTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAllDramas().then((res) => setDramas(res || []));
  }, []);

  // Update slug saat drama atau episodeNum berubah
  useEffect(() => {
    if (selectedDramaTitle && form.episodeNum) {
      const slugifiedTitle = selectedDramaTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      setForm((prev) => ({
        ...prev,
        slug: `${slugifiedTitle}-episod-${prev.episodeNum}`,
      }));
    }
  }, [selectedDramaTitle, form.episodeNum]);

  // Update videoUrl berdasarkan slug dan episodeNum
  useEffect(() => {
    if (form.slug && form.episodeNum) {
      const videoSlug = form.slug.replace(/-episod-\d+$/, ""); // hilangkan '-episod-3'

      setForm((prev) => ({
        ...prev,
        videoUrl: `https://cdn.mangeakkk.my.id/${videoSlug}/${prev.episodeNum}/index.m3u8`,
      }));
    }
  }, [form.slug, form.episodeNum]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "episodeNum" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await createEpisode(form);

      if (result?.success) {
        addToast({
          title: "Success",
          description: "Episode created successfully",
          color: "success",
        });
        setForm({
          slug: "",
          episodeNum: 1,
          videoUrl: "",
          releaseDate: "",
          dramaId: "",
        });
        setSelectedDramaTitle("");
      } else {
        addToast({
          title: "Error",
          description: result?.error || "Failed to create episode",
          color: "danger",
        });
      }
    });
  };

  return (
    <Form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
      <Input isDisabled label="Slug" name="slug" value={form.slug} />
      <Input
        isRequired
        label="Nomor Episode"
        name="episodeNum"
        type="number"
        value={String(form.episodeNum)}
        onChange={handleChange}
      />
      <Input
        isDisabled
        label="Video URL"
        name="videoUrl"
        value={form.videoUrl}
      />
      <Input
        label="Tanggal Rilis"
        name="releaseDate"
        type="date"
        value={form.releaseDate}
        onChange={handleChange}
      />
      <Select
        label="Pilih Drama"
        name="dramaId"
        selectedKeys={[form.dramaId]}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedDrama = dramas.find((d) => d.id === selectedId);

          setForm((prev) => ({
            ...prev,
            dramaId: selectedId,
          }));

          if (selectedDrama) {
            setSelectedDramaTitle(selectedDrama.title);
          }
        }}
      >
        {dramas.map((drama) => (
          <SelectItem key={drama.id}>{drama.title}</SelectItem>
        ))}
      </Select>
      <Button
        className="w-full"
        color="primary"
        isLoading={isPending}
        type="submit"
      >
        Buat Episode
      </Button>
    </Form>
  );
}
